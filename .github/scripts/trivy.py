#!/usr/bin/python
import os
import json
import argparse
from urllib.request import Request, urlopen


def create_markdown_table(vulnerabilities):
    header = f"## 🔥 Trivy detects the following vulnerabilities 🔥\n"
    header += "| VulnerabilityID | PkgName | InstalledVersion | FixedVersion | Severity |"
    separator = "|-----------------|---------|------------------|--------------|----------|"

    rows = []
    for vulnerability in vulnerabilities:
        vulnerability_id = vulnerability.get("VulnerabilityID", "")
        pkg_name = vulnerability.get("PkgName", "")
        installed_version = vulnerability.get("InstalledVersion", "")
        fixed_version = vulnerability.get("FixedVersion", "")
        severity = vulnerability.get("Severity", "")

        primary_url = vulnerability.get("PrimaryURL", "")

        vulnerability_id_link = f"[{vulnerability_id}]({primary_url})" if primary_url else vulnerability_id

        row = f"| {vulnerability_id_link} | {pkg_name} | {installed_version} | {fixed_version} | {severity} |"
        rows.append(row)

    table = "\n".join([header, separator] + rows)
    return table


def change_status(success, owner, repo, sha, github_token, appName):
    data = {
        "state": "success" if success else "failure",
        "context": "PR-Security" if appName == "" else "PR-Security-"+appName,
        "description": "Security scan success" if success else "Security scan failure",
        "target_url": ""
    }
    print(data)
    url = f"https://api.github.com/repos/{owner}/{repo}/statuses/{sha}"
    req = Request(url, data=data)
    req.add_header('Accept', 'application/vnd.github.v3+json')
    req.add_header('Authorization', f"Bearer {github_token}")
    req.add_header('Content-Type', 'application/json; charset=utf-8')
    jsondata = json.dumps(data)
    jsondataasbytes = jsondata.encode('utf-8')   # needs to be bytes
    resp = urlopen(req, jsondataasbytes)


def comment_pr(owner, repo, pr_number, body, github_token):
    data = {
        "body": body,
        "event": "COMMENT"
    }
    url = f"https://api.github.com/repos/{owner}/{repo}/pulls/{pr_number}/reviews"
    req = Request(url, data=data)
    req.add_header('Accept', 'application/vnd.github.v3+json')
    req.add_header('Authorization', f"Bearer {github_token}")
    req.add_header('Content-Type', 'application/json; charset=utf-8')
    jsondata = json.dumps(data)
    jsondataasbytes = jsondata.encode('utf-8')   # needs to be bytes
    resp = urlopen(req, jsondataasbytes)


github_token = os.getenv("GITHUB_TOKEN")

parser = argparse.ArgumentParser(description='Trivy parser')
parser.add_argument('--vulns', type=str, help='Trivy vulnerabilities')
parser.add_argument('--owner', type=str, help='Github owner')
parser.add_argument('--repo', type=str, help='Github repo')
parser.add_argument('--pr', type=str, help='Pull request number')
parser.add_argument('--sha', type=str, help='Pull request number')
parser.add_argument('--appname', type=str, help='App name')

args = parser.parse_args()
if args.appname == None:
    args.appname = ""
if args.appname != "":
    args.appname = args.appname[0].upper() + args.appname[1:]

# Opening JSON file
f = open(args.vulns)

# returns JSON object as
# a dictionary
data = json.load(f)

# Iterating through the json
# list
results = data['Results']
vulns = []
secrets = {}
for r in results:
    if r['Class'] == 'lang-pkgs':
        vulns += r['Vulnerabilities']
    elif r['Class'] == 'secret':
        if r['Target'] in secrets:
            secrets[r['Target']] += r['Secrets']
        else:
            secrets[r['Target']] = r['Secrets']

# through the json list
whitelist = []
# Opening JSON file if exists
if os.path.exists('.github/scripts/whitelist.json'):
    with open('.github/scripts/whitelist.json') as json_file:
        whitelist = json.load(json_file)


# remove repeated vulnerabilities
diccVulns = {}
vulnsResult = []
for v in vulns:
    if v['VulnerabilityID'] in diccVulns:
        continue
    else:
        diccVulns[v['VulnerabilityID']] = True
        vulnsResult.append(v)

# remove whitelisted vulnerabilities
vulnsFinal = []
for v in vulnsResult:
    whitelisted = False
    for w in whitelist:
        if w['VulnerabilityID'] == v['VulnerabilityID']:
            whitelisted = True
            break
    if not whitelisted:
        vulnsFinal.append(v)

vulns = vulnsFinal
hasCritical = False
hasHigh = False
for v in vulns:
    if v['Severity'] == 'CRITICAL':
        hasCritical = True
    if v['Severity'] == 'HIGH':
        hasHigh = True
if len(vulns) > 0:
    idDicc = {}
    appname = args.appname
    if appname == "":
        appname = args.repo
    body = create_markdown_table(vulns)

    comment_pr(args.owner, args.repo, args.pr, body, github_token)

if hasCritical or hasHigh:
    change_status(False, args.owner, args.repo,
                  args.sha, github_token, args.appname)
else:
    change_status(True, args.owner, args.repo,
                  args.sha, github_token, args.appname)


# Closing file
f.close()

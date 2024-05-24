import { FC, useState } from "react"

interface SwitcherProps {
  left: string
  right: string
  onClick(): void
  isLeftActiveTab: boolean
}

export const Switcher: FC<SwitcherProps> = ({ left, right, isLeftActiveTab, onClick }) => {
  const [isTrendActiveTab, setActiveTab] = useState(isLeftActiveTab)

  const handleClick = () => {
    setActiveTab((prevValue: boolean) => !prevValue)
    onClick()
  }

  return (
    <div
      aria-orientation="horizontal"
      className="inline-flex h-10 items-center justify-center rounded-md bg-modal border border-modal-50 p-1"
      data-orientation="horizontal"
      role="tablist"
    >
      <button
        aria-selected={isTrendActiveTab ? 'true' : 'false'}
        className="inline-flex items-center text-gray-100 justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-gray-900 data-[state=active]:text-purple data-[state=active]:shadow-sm hover:text-purple"
        data-orientation="horizontal"
        data-state={isTrendActiveTab ? 'active' : ''}
        role="tab"
        type="button"
        onClick={handleClick}
      >
        {left}
      </button>
      <button
        aria-selected={!isTrendActiveTab ? 'true' : 'false'}
        className="inline-flex items-center text-gray-100 justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-gray-900 data-[state=active]:text-purple data-[state=active]:shadow-sm hover:text-purple"
        data-orientation="horizontal"
        data-state={!isTrendActiveTab ? 'active' : ''}
        role="tab"
        type="button"
        onClick={handleClick}
      >
        {right}
      </button>
    </div>
  )
}
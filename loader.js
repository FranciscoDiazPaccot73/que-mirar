export default `
#spinner{
  position:absolute;
  display:flex;
  justify-content:center;
  align-items:center;
  background:#1a202c;
  z-index:1000;
  height:100vh;
  width:100%;
}
.spinner{
  width:64px;
  height:64px;
  display:grid;
  border:4px solid #0000;
  border-radius:50%;
  border-right-color:#b897f2;
  animation:spinner-a4dj62 1s infinite linear;
}
.scroll-disabled{
  overflow:hidden;
}
@keyframes spinner-a4dj62 {
  100% {
    transform:rotate(1turn);
  }
}`;




export default function AppHome(){
    return(
        <div>
        <ul style={{display:"inline-block"}}>
          <li><a href= {projurl}>Home</a></li>
          <li><a href= {projurl + 'about'}>About</a></li>
          <li><a href= {projurl + 'contact'}>Contact</a></li>  
        </ul>
        <h2 style={{marginTop:"20px"}}>Home Page</h2>
        </div>
    )
}
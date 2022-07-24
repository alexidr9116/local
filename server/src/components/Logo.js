export default function Logo({mode='white'}){
    return(
        
        <img src = {`/assets/logo-${mode}.png`} alt = 'logo' className="h-10 text-accent"/>
    )
}
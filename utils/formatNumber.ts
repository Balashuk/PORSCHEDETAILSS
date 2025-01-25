export const formatNumber=(digit:number)=>{
    return new Intl.NumberFormat("uk-UA").format(digit)
}
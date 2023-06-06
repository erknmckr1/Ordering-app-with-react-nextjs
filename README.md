# Ordering-App-with-React-Nextjs

[Emin Başbayan](https://www.udemy.com/user/emin-144/) ve Bil-Gen tarafından hazırlanmıs React (Next.js) ile Full Stack Yemek Sipariş Projesi. 
[Proje Linki](). 
* React.   
* Next.js.   
* Tailwind. 
* CSS. 
* Redux. 
* Redux-Toolkit. 
* Next-Auth. 
* Deployment. 


* Tailwind CSS ile peer işlemlerine göz at... 
* Object destructure [const { type, errorMessage, touched, placeholder, ...inputProps } = props;]

## Product Page hesap işlemleri

const handleExtra = (e,item) =>{
    const checked = e.target.checked
    if(checked){
      setExtras([...extras,item])
      setSelectedExtra(selectedExtra + item.price)
      
    }else{
      setSelectedExtra(selectedExtra - item.price)
      const filteredExtra = extras.filter((extra)=> extra.id !== item.id)
      setExtras(filteredExtra)
    }
  }
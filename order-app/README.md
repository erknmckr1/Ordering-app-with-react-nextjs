## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Kullanılan Paketler
- react-outside-click-handler
  

### Bir elementi DOM'a ekleyip nasıl çıkaralım.
Bır elementı click eventi ile ekleyıp cıkaralım. Click out side paketı kullanmasaydık temelde asagı gıbı yapabılırdık. 

const [isSearcModal,setİsSerchModal] = useState(false)
  const closeModal = (e)=>{
    if(e.target.id==='modal'){
    return  setİsSerchModal(false)
    }
    
  }

{isSearcModal ? ( <div onClick={closeModal} id="modal" className="text-9xl">MODAL</div>): <div></div>}


---
### Title komponenti

function Title({children,className}) {
  return (
    <div className={`className`}>{children}</div>
  )
}

export default Title

 <Title className="x">Title</Title>

Yukarıdaki title bılesenını bırden fazla yerde kullanacagımız ıcın her her seferınde yazmak yerınde bır bılesen olusturup, bılesen ıcıne yazdıgımız degerı bılesene prop olarak geçtik 

---

- Tailwind css i yıne globalde kullanmak ıstersek herhangı bır class name ile @apply ile kullanabılrıız.
.xx{
  @apply hidden flex
}


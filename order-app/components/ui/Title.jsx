import React from 'react'

// Projede bırden fazla bu yazı tıpını kullandıgımız ıcın sureklı aynı ıslemlerı tekrarlamamak ıcın component olarak aldık. 

function Title({children,addClass}) {
  return (
    <div className={`${addClass} font-bold font-dancing`}>{children}</div>
  )
}

export default Title

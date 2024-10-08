// my latest code example

const initId=()=>{
  id.srv=restipdi
  id.rn='Report'
  id.i=2
  id.nod=0
}

const drop=async()=>{
  const 
    a=await fn(),
    tfp=dqa('.tfparent'),
    sa=storeArray(a)
    da=deptArray(a)
  if(da[0]=='ALL') da.splice(0,1)

  const
    ar=[sa.map(n=>{return{n,v:nth(n)}}),da.map(n=>{return{n,v:n}})],
    // ck=['all',[1]]
    // ck=['all',[1,2]]
    ck=['all','all']
  
  id.sc=ar.map((ar,i)=>setCb({tp:tfp[i],ar,ck:ck[i]}))
  tfp.forEach(x=>x.onchange=cmdset)
}

const cmdset=async()=>{
  const 
    ra=splitRangeOn(id.p),
    ck=id.sc.map(x=>x.ckn()),
    cv=ck.every(x=>x.length)
  if(!cv){
    cls()
    id.rpt.hidden=true
    return
  }

  ui(0)

  const j=await fg('json/cogs.json')
  const m=await fp(`${id.srv}/cogs/rpt`,{ra,ck})

  const row=z=>{
    const{b,me,hbf,cl}=z
    const tr=lib.dc('tr')
    if(cl) tr.classList=cl
    b.forEach(x=>{
      let td
      if(me){
        td=lib.dc('td')
        td.colSpan=x.co.length
        td.innerHTML=x.me
        tr.appendChild(td)
      }
      else{
        x.co.forEach(x=>{
          td=lib.dc('td')
          td.innerText=x.n
          td.classList.add(x.f)
          tr.appendChild(td)
        })
      }
      td.classList.add('br')
    })
    hbf.appendChild(tr)
    return tr
  }

  cls()
  comCap()
  const b=j
  row({b,hbf:id.thead,cl:'merge',me:true})

  const core=(x,ab)=>{
    
    const b=jsp(j)
    const a=b.flatMap(x=>x.co)
    a.forEach((y,i)=>{
      if(i==0) y.ds=x.f1132
      else if(i==1||i==2) y.ds=x[y.f]
      else if(i==3) y.ds=(x.sf65-x.sf1301)/x.sf65
      if(y.fm) y.n=fm[y.fm](y.ds,y.d)
      else y.n=y.ds
      y.f1056=x.f1056  
    })
    if(ab) return{a,b}
    return b
  }

  const hd=x=>{
    const mgn=()=>{
      const tr=lib.dc('tr')
      tr.classList='margin'
      id.tbody.appendChild(tr)
      return tr
    }
    const m=mgn()
    
    const b=jsp(j)
    const a=b.flatMap(x=>x.co)
    const c=a.find(x=>x.f=='f5632')
    a.forEach(x=>x.n='')
    c.n=x
    const r=row({b,hbf:id.tbody,cl:'hf'})
    return [m,r]
  }

  const rdc=z=>{
    const {f1056,f1132,li,ab}=z
    let x
    if(li.length>1) x=li.reduce((x,y)=>({
      f1132,
      sf65:x.sf65+y.sf65,
      sf1301:x.sf1301+y.sf1301
    }))
    else{
      x=jsp(li[0])
      x.f1132=f1132
    }
    x.f1056=f1056
    const b=core(x,ab)
    return b
  }

  Array.from(new Set(m.map(x=>x.f1056))).sort().forEach((x,i)=>{

    // if(i>2) return

    const h=hd(nth(x))

    const sl=m.filter(y=>y.f1056==x).sort((x,y)=>{
      if(x.f1132<y.f1132) return -1
      else if(x.f1132>y.f1132) return 1
    })

    const c=sl.map(x=>{
      const b=core(x)
      const c=row({b,hbf:id.tbody,cl:'sl'})
      return c
    })

    const sttl=()=>{
      const f1056=sl[0].f1056
      const ab=rdc({f1056,f1132:`${nth(f1056)} Total`,li:sl,ab:true})
      const b=ab.b
      const s=row({b,hbf:id.tbody,cl:'hf'})
      return s
    }
    const s=sttl()
  })
  
  const thd=row({b,hbf:id.thead})

  const gt=()=>{
    hd('Group Total')

    Array.from(new Set(m.map(x=>x.f1132))).forEach((x,i)=>{
      const gl=m.filter(y=>y.f1132==x)
      const b=rdc({f1132:x,li:gl})
      row({b,hbf:id.tbody})
    })
  
    const gttl=()=>{
      const b=rdc({f1132:`Grand Total`,li:m})
      row({b,hbf:id.tfoot})
    }
    gttl()
  }

  gt()
  ui(1)
}

const af=async()=>{
  initId()
  await initTable()
  await drop()
  
  cl(id.pbtnd)
  // cl(pBtn[1])
}

af()

// work on ui() order and render

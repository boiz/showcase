// sorting and libs

const id={}

const dq=z=>document.querySelector(z)
const dc=z=>document.createElement(z)
const jsp=z=>JSON.parse(JSON.stringify(z))
const dqa=z=>document.querySelectorAll(z)
const sup=z=>z.map(x=>x.ds).reduce((x,y)=>x+y,0)
const cls=()=>['thead','tbody','tfoot'].forEach(x=>id[x].innerHTML='')
const setId=x=>id[x]=document.getElementsByClassName(x)[0]

const ui=z=>{
  if(z){
    id.ws.hidden=true
    id.rpt.hidden=false
    pullTime()
  }
  else id.ws.hidden=false
}

const pageNode=m=>m.page.list.find(x=>x.url==href2url())
const pageTitle=()=>`${pageNode(json.meta[0]).name} ${id.rn}`

const initTable=async()=>{
	if(!json.meta) await fn()
  dq('.head').innerText=pageTitle()
	;['rpt','table','thead','tbody','tfoot',
		'mai','sec','ptime','ws','go','form','search'].forEach(setId)
}

const comCap=()=>{
	const a=pageTitle()
	const b=`${ll().type} ${a}`
	id.mai.innerText=b
	id.sec.innerText=ll().day
}

const sb='--'

// ERror Handling
const erh=z=>{
	if(isFinite(z)) return z
	else return sb
}

const fm={
	// THousand Separator
	ths:(z,y)=>{
		if(typeof z=='number') return z.toFixed(y).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		else return z
	},
	// THousand Amount
	tha:(z,y)=>{
		if(isFinite(z)) return `$ ${fm.ths(z,y)}`
		else return sb
	},
	// PERcent
	per:(z,y)=>{
		if(isFinite(z)){
			if(typeof z=='number') return `${(z*100).toFixed(y)} %`
			else return z
		}
		else return sb
	},
	// No Null
	nn:z=>{
		if(z) return z.replace(/null/g,'')
		else return ''
	},
	kz:z=>killZtoString(z),
	nth:z=>nth(z),
	relz,
	free:z=>{
		if(z) return 'Yes'
		else return ''
	},
	pad:(ds,d)=>ds.toString().padStart(d,0)
}


id.sort=z=>{
  const {thd,f,nod,ds,body}=z
  const od=['asc','desc']
  const raf=(el,nod,f)=>{
    od.forEach(y=>thd.children.forEach(x=>x.classList.remove(y)))
    el.classList.add(od[nod])
    let v=-1
    if(nod) v=1
    ds.sort((x,y)=>{
      if(x[f]>y[f]) return -1*v
      else if(x[f]<y[f]) return 1*v
    })
    body()
  }
  thd.classList='sort'
  thd.children.forEach((x,i)=>{
    const sp=lib.dc('span')
    sp.classList='order'
    x.appendChild(sp)
    x.onclick=e=>{
			const a=od.some(y=>x.classList.contains(y))
			if(a) id.nod=Number(!id.nod)
			else id.nod=1
      raf(x,id.nod,id.f=x.classList[0])
    }
  })
  const tc=thd.getElementsByClassName(f)[0]
  raf(tc,tc.nod=nod,f)
}
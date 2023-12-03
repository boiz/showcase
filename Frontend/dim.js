const dateAdd=(d,n)=>moment(new Date(d)).add(n,'d').format('l')
const id={}
const gl={}

let cm

const ff=()=>{
	const aa=z=>id[z]=document.querySelector(`.${z}`)
	;['upc','apply','go','range','modal','rpt','cancel','cs1'].forEach(aa)
	cm={
		f254:'Date',
		f1056:'Store',
		f04:'Sub Dept',
		f01:'Item UPC',
		f29:'Desc',
		f22:'Size',
		fvar:'Inv. Var.',
		fpur:'Purchase',
		fadj:'Adjustment',
		fsal:'Sales',
		finv:'Inv.',
		fdb:'DB Value'
	}
}

ff()

const aa=()=>{
	const ee=v=>{
		const a=document.querySelectorAll('.tfparent')
		id.tf={
			tgt:a[0],
			dpt:a[1]
		}
		id.ar={
			tgt:storeArray(v),
			dpt:deptArray(v)
		}
		dva1(id.ar.dpt,'ALL')
	}

	funnel(async v=>{
		ee(v)
		const ff=z=>setCb(id.tf[z],id.ar[z],0,f)
		const f=()=>{}
		for(const k in id.tf) ff(k,f)
		
		json.meta=v

		chec()

		//gog(v)

		//ll(mock)


	})

}

aa()

const bb=()=>{

	const u=id.upc

	u.onkeydown=e=>{
		if(e.keyCode==13) dd(u.value)
		else ee(false)
	}

	u.onclick=e=>{
		u.select()
	}

	u.onblur=id.apply.onclick=e=>{
		dd(u.value)
	}

}

bb()

const fu=u=>{
  let z=''
  for(let i=0;i<13-u.length;i++) z+='0'
  return z+u
}

const cc=async()=>{
	const a=await fg(`${restIm}/f01List`)
	json.fl=a
}

const ee=z=>{
	const a=id.apply
	a.disabled=z
	if(z) a.innerText='Applied'
	else a.innerText='Apply'
}


const dd=async v=>{

	const u=id.upc
	const a=json.fl

	if(v!='ALL'){
		const c=fu(v)
		if(a){
			const b=a.find(x=>x==c)
			if(b){
				u.value=b
			}
			else u.value='ALL'
		}
		else{
			cc()
			const a=await fp(`${restIm}/f01List`,{f01:c})
			if(a.length){
				u.value=a[0].f01
			}
			else u.value='ALL'
		}
	}
	ee(true)
}

const gg=()=>{

	const r=$(id.range)
	const aa=(z=0)=>moment().add(z,'day')
	const b=aa(-1)
	const a=[b,b]

	r.daterangepicker({
		autoApply:true,
		locale:{
			format:'M/D/YYYY'
		},
		alwaysShowCalendars:true,
		ranges:{
	  	'Yesterday': a,
	  	'Last 3 Days': [aa(-3),b],
	  	'Last 7 Days': [aa(-7),b]
		},
		startDate:aa(-1),
		endDate:aa(-1)
	})
	r.on('apply.daterangepicker',()=>{})
}

gg()

const hh=()=>{
	const dateDiff=(z,y)=>new Date(z)-new Date(y)
	const dayCalc=df=>df/86400000+1
	const a=splitRangeOn(id.range).reverse()
	const b=dateDiff(...a)
	const c=dayCalc(b)

	const m=$(id.modal)
	//m.modal('show')

}

hh()

const oo=()=>{

	const aa=z=>cb(id.tf[z]).map(x=>x.name)

	const ot={}
	const uv=id.upc.value
	if(uv!='ALL') ot.F01=[uv]
	
	ot.F1056=aa('tgt')
	ot.F1132=aa('dpt')

	const r={
		ra:splitRangeOn(id.range),
		ot
	}

	//console.log(r)
	return r
}

const co=v=>{
	const a=`${+new Date}${v[1]}`
	return a
}

const crb=o=>{
  const a=o.F1056.length&&o.F1132.length
  return a
}

const chec=()=>{
	const a=id.tf.tgt.querySelectorAll('ul input')
	const b=id.tf.dpt.querySelectorAll('ul input')

	const aa=(z,y)=>z[y].click()

	;[0,1].forEach(x=>aa(a,x))
	;[0,1].forEach(x=>aa(b,x))
	
	//id.upc.value='0000000017258'
}

const west=o=>{

	const s=document.querySelector('.status')
	const i={}
	const aa=z=>i[z]=s.querySelector(`.${z}`)

	;['we','sta','st','wet','stt','ts','tst','or'].forEach(aa)
	id.west=i

	for(const k in o) i[k].innerText=o[k]

}


const ii=async (url,bo)=>fp(`${restIm}/${url}`,bo)

const nn=b=>{
	const c=createTr(cm,b)
	id.tbody.appendChild(c)
}

const ts=z=>{
  const r=[]
  for(const k in z){
    const a=z[k]
    let b=''
    if(a||a==0) b=a.toString()
    r.push(b)
  }
  return r
}

const js=b=>{
	const a=ts(b)
	gl.js.push(a)
}

const jj=()=>{
	ui.reset(id.rpt)
	createTable()
	caption()
	headFoot(id.table,'thead',cm)
	id.tbody=cte(id.table,'tbody')
}

const kk=()=>{

	const a=json.once.tl
	a.sort((x,y)=>x.f1034-y.f1034)
	const aa=z=>{
		const aa=x=>x.F1710.includes(z)
		const b=a.filter(aa).map(x=>x.F1034)
		return b
	}
	const b={
		fvar:aa('ITM+').slice(1),
		fpur:[8201],
    fadj:aa('ITM-'),
    fsal:aa('COS')
	}
	return b
}



const ll=async mock=>{

  const m=kk()

  mock.f[0].forEach(x=>{
    const aa=y=>m[y].includes(x.F1034)
    const a=aa(['fadj'])||aa(['fsal'])
    if(a) x.F64=-x.F64
  })

  let f1056=''
  
  if(mock.f[2].length) f1056=mock.f[2][0].F1056


  const dw=mock.f

  const uu=()=>{
    const a=dw.flat().map(x=>x.F01)
    const b=new Set(a)
    const c=Array.from(b)
    return c
  }

  const dd=(f01,f254)=>{

    const bb=z=>z.filter(x=>x.F01==f01)
    const [d,w]=[...dw].map(bb)

    const u={d,w}

    const cc=()=>{
      const a=u.w[0]
      let p=0
      if(a) p=a.F64
      return p
    }

    const p=cc()

    const td=json.once.td.find(x=>x.F01==f01)
    let f04,f29,f22
    f04=f29=f22=''
    if(td) [f04,f29,f22]=[td.F04,td.F29,td.F22]
    
    const r={f254,f1056,f01,f04,f29,f22}

    const tr=x=>{
      const a=killZ(x.F254)
      const [b0,c0]=[+new Date(mock.a.w),+new Date(f254)]
      const d=a>b0&&a<=c0
      return d
    }

    const mp=z=>z.map(x=>x.F64).reduce((x,y)=>x+y,0)
    const da=x=>killZ(x.F254)==+new Date(f254)

    const aa=z=>{
      const a=u.d.filter(da).filter(x=>m[z].includes(x.F1034))
      return mp(a)
    }


    const q=[]
    for(const k in m){
      const f=aa(k)
      const g=Math.round(f)
      gl.su[k]+=g
      q.push(r[k]=g)
    }

    let v

    const id=()=>{
      //const s=q.some(x=>x)
      const e=u.d.filter(tr)
      const i=mp(e)
      const pi=p+i
      r.finv=Math.round(pi)
      v={r,q}


      r.fdb=''
      const ia=x=>x.F01==f01
      const iv=mock.f[2].find(ia)
      
      if(iv) r.fdb=+(iv.F65*pi).toFixed(2)

    }
    
    id()


    return v

  }

  const ra=oo().ra
	const [r0,r1]=[...ra.map(x=>+new Date(x))]
  
  const tt=()=>{
    const r=[]      
    for(let i=1;i<=7;i++){
      const b=dateAdd(mock.a.w,i)
      const c=+new Date(b)
      const d=c>=r0&&c<=r1
      if(d) r.push(b)
    }
    return r
  }
  
  let f

  const s1=()=>{
    const e=uu()[100]
    const aa=d=>dd(e,d)
    f=tt().map(aa).filter(x=>x.s).map(x=>x.r)
  }

	const chunk=(arr,size)=>{
	  const chunkSize = size;
	  const a=[]
	  for (let i = 0; i < arr.length; i += chunkSize) {
	    const chunk = arr.slice(i, i + chunkSize);
	    a.push(chunk)
	  }
	  return a
	}

  const s2=async()=>{
    const lo0=e=>tt().map(t=>dd(e,t))
    const u=100
    const g=uu()
    const h=chunk(g,250)
    
    const aa=x=>new Promise(resolve=>{
			setTimeout(()=>{
				const a=x.map(lo0)

				a.forEach(x=>{
					x.forEach(y=>{
						if(id.cs1.checked){
							if(y.q.some(x=>x)) nn(y.r)
						}
						else js(y.r)
						west({or:++gl.ct})
					})
				})

				sr('ts')
				resolve()
			},0)
    })

    for(const x of h) {
    	if(gl.run) await aa(x)
    }

  }

  await s2()

  return f

}

const fct=z=>{
	document.querySelectorAll('.form-control').forEach(x=>{
		if(z) x.disabled=true
		else x.disabled=false
	})
}

const sto=z=>new Promise(resolve=>setTimeout(resolve,z))

const ef=e=>{
  const b=[]
  e.forEach((x,ix)=>{
    e[ix].li.forEach((y,iy)=>{
      const a={we:ix,st:iy}
      b.push(a)
    })
  })
  return b
}

const pp=()=>{
	id.go.onclick=e=>gog(json.meta)
	id.cancel.onclick=e=>{
		gl.run=false
		gc(false)
		west({sta:'Canceled'})
	}
	id.cs1.onchange=e=>{
		const a=id.rpt
		if(id.cs1.checked) a.hidden=false
		else a.hidden=true
	}

}

pp()

const gog=async v=>{

	ini()

	const w=west
	const sm=z=>w({sta:z})

	const rb=oo()
	const le=crb(rb.ot)
	
	if(le){
		
		sm('Initializing..')
		
		let e

		//json.once=once;e=once.e
		
		const on=json.once=await ii('imrOnce',rb);e=on.e
				
		w({
			wet:e.length,
			stt:e[0].li.length
		})

		jj()

		sm('Processing')

		const f=ef(e)
		const g=f.slice(0)

		for(const x of g){

			const mr={...rb,ws:x}

			const mult=await ii('imrMult',mr)
			
			for(const k in x) x[k]+=1			
			w(x)
			
			await ll(mult)

		}

		if(gl.run){
			fi()
		}

	}

	else{
		gc(false)
		west({sta:'Invaild Filters'})
	}

}

const sr=z=>{
	const a={}
	if(id.cs1.checked) a[z]=id.table.tBodies[0].rows.length
	else a[z]=gl.js.length-1
	west(a)
}

const ini=()=>{
	if(id.table) id.table.tBodies[0].innerHTML=''
	const w=id.west
	for(k in w){
		const a={}
		a[k]=''
		west(a)
	}
	gl.run=true
	gc(true)
	gl.su={fvar: 0, fpur: 0, fadj: 0, fsal: 0}
	gl.ct=0
	gl.js=[ts(cm)]
}

const gc=z=>{
	id.go.disabled=z
	id.cancel.disabled=!z
	fct(z)
}

const fi=()=>{
	sr('tst')
	west({sta:'Completed'})
	gc(false)

	const o={}
	for(const k in cm){

		const a=['fsal','fpur','fvar','fadj'].includes(k)

		if(a) o[k]=gl.su[k]
		else o[k]=''
		
	}

	headFoot(id.table,'tfoot',o)
	
}

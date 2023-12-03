const moment=require('moment')
const dateAdd=(d,n)=>moment(new Date(d)).add(n,'d').format('l')
const dateDiff=(z,y)=>new Date(z)-new Date(y)

const aa=d=>{
  const aa=(z,y)=>moment(new Date(d))[`${z}Of`](y).format('l')
  const a=aa('start','isoweek')
  const b={
    w:dateAdd(a,-1),
    d:[a,aa('end','isoweek')]
  }
  return b
}

const bb=ra=>{
  const c=[]
  const a=ra.map(aa).map(x=>x.d[1])
  const b=-dateDiff(...a)/86400000/7
  for(let i=0;i<=b;i++){
    const d=dateAdd(a[0],i*7)
    const e=aa(d)
    c.push(e)
  }
  return c
}

const cc=o=>{
  const bb=(k,v)=>{
    const aa=z=>`and ${z}${k} in (${v.map(x=>`'${x}'`)}) `
    let a=''
    if(k=='F1132') a=aa('')
    else a=aa('rp.')
    return a
  }

  let a=''
  for(const k in o){
    const v=o[k]
    a+=bb(k,v)
  }
  return a
}

const te='tempDim'

// const mock={
//   ra:['6/1/2023','6/16/2023'],
//   ot:{
//     // F01:['0000000000008'],
//     F1132:['GROCERY'],
//     F1056:['002','003','006','009']
//   }
// }

const ff=mock=>{

  const o=cc(mock.ot)

  const ee=(dw,fe)=>`select ${fe} from rpt_itm_${dw} rp join ${te} te on te.f01=rp.f01 where`
  
  const fe={
    dw:['F254','F1056','F01','F1034','F64'],
    iv:['F1056','F01','F65'],
    td:['F01','F1132']
  }

  const ff=fe=>{
    const a=fe.map(x=>`rp.${x}`)
    return a.join(',')
  }
 
  const dd=od=>{

    const a={od}

    const bb=dw=>{
      if(dw=='d') return ` between '${od.d[0]}' and '${od.d[1]}'`
      else if(dw=='w') return `='${od.w}'`
    }

    const aa=(dw,p)=>{
      const a=ff(fe.dw)
      return `${ee(dw,a)} f64!=0 ${p}and f254${bb(dw)}`
    }

    const f=mock.ot.F1056.map(x=>{
      const a={
        F1132:mock.ot.F1132,
        F1056:[x]        
      }

      if(mock.ot.F01) a.F01=mock.ot.F01
      return a
    })

    const gg=p=>{
      const b={}
      for(const k in od) b[k]=aa(k,p)

      const c=ff(fe.iv)
      b.iv=`${ee('iv',c)} f1034=1000 ${p}`

      return b
    }
    
    const p=f.map(cc)
    const b=p.map(gg)

    a.li=b
    return a

  }

  const a=bb(mock.ra)
  const dw=a.map(dd)

  const aa=o=>{
    const a={}
    for(const k in o){
      const b=k.toUpperCase()
      if(fe.td.includes(b)) a[k]=o[k]
    }
    return a
  }

  const a0=aa(mock.ot)
  const a1=cc(a0)

  const td=`select * from ${te} rp where f04>0 ${a1}`
  const b={dw,td}

  return b

}

exports.run=ff

exports.q={
  di:`
    drop table if exists ${te}
  `,
  te:`
    select obj.F01,F29,F22,F1132,dep.F03,pos.F04 into ${te} from obj_tab obj
    left join ( select f01,f04 from (select *, row_number() over (partition by f01 order by f04) row_number from pos_tab) rows where row_number = 1) pos on obj.f01=pos.f01
    left join sdp_tab sdp on sdp.f04=pos.f04
    left join dept_tab dep on dep.f03=sdp.f03
  `,
  tl:`
    select F1034,F1710 from tlz_tab where F1710 like '%8501'
  `
}

//const a=ff(mock)
//console.log(a)
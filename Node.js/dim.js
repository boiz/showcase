const lib=require('../lib')
const as=require('../lib/async')
const di=require('../functions/dim.od')
const de=require('../lib/decent')

const ee=mock=>{
  const a=di.run(mock)

  const e=a.dw

  return e  
}

const once=async mock=>{

  const a=di.run(mock)
  const e=a.dw

  const es=async()=>{
    await as.sqi(di.q.di)
    await as.sqi(di.q.te)
  }

  await es()

  const tl=await as.sqi(di.q.tl)
  const g=tl.map(x=>x.F1034)

  const td=await as.sqi(a.td)

  const r={e,tl,td,g}

  return r

}

const mult=async(od,b,g)=>{

  const f=await Promise.all([as.sqi(b.d),as.sqi(b.w),as.sqi(b.iv)])
  f[0]=f[0].filter(x=>g.includes(x.F1034))
  const dw={a:od,f}
  
  return dw

}

exports.run={once,mult,ee}


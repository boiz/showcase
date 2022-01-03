//dev.js

//Pull data from SQL Server with express.js and handle a complicate array process

const fs=require("fs")
const express=require("express")
const app=express()

const moment=require('moment')

const http=require('http')
const https=require('https')
const privateKey =fs.readFileSync('ssl/311.key', 'utf8')
const certificate=fs.readFileSync('ssl/311.crt', 'utf8')
const credentials={key: privateKey, cert: certificate}

const httpServer=http.createServer(app)
const httpsServer=https.createServer(credentials, app)

const multer=require('multer')
const upload=multer()

const bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

const sql=require("msnodesqlv8");
const lib=require('./lib')

// LM 12/11/2021

const d2Range=d=>{

  const MDY='MM/DD/YYYY'
  const day=moment(d,MDY).format('d')
  let move=0

  if(day==0) move=-7

  const start=moment(d,MDY).startOf('isoweek').format('l')
  const end=d

  const sunday=moment(d,MDY).add(move,'d').startOf('week').format('l')

  return {
    d:[start,end],
    w:sunday
  }

}

const earliest=[
  { f254: '2020-08-04T00:00:00.000Z', f1056: '020' },
  { f254: '2020-11-06T00:00:00.000Z', f1056: '012' },
  { f254: '2018-10-12T00:00:00.000Z', f1056: '998' },
  { f254: '2020-11-06T00:00:00.000Z', f1056: '014' },
  { f254: '2020-11-06T00:00:00.000Z', f1056: '024' },
  { f254: '2020-11-05T00:00:00.000Z', f1056: '007' },
  { f254: '2018-08-26T00:00:00.000Z', f1056: '022' },
  { f254: '2020-11-06T00:00:00.000Z', f1056: '010' },
  { f254: '2020-11-06T00:00:00.000Z', f1056: '018' },
  { f254: '2020-11-06T00:00:00.000Z', f1056: '011' },
  { f254: '2020-11-06T00:00:00.000Z', f1056: '006' },
  { f254: '2020-11-06T00:00:00.000Z', f1056: '009' },
  { f254: '2020-05-04T00:00:00.000Z', f1056: '017' },
  { f254: '2020-11-06T00:00:00.000Z', f1056: '003' },
  { f254: '2021-02-01T00:00:00.000Z', f1056: '002' },
  { f254: '2020-07-29T00:00:00.000Z', f1056: '021' },
  { f254: '2021-02-18T00:00:00.000Z', f1056: '025' },
  { f254: '2020-11-06T00:00:00.000Z', f1056: '019' }

]


const f10562Ls=f1056=>moment(earliest.find(x=>x.f1056==f1056).f254.substring(0,10),'YYYY-MM-DD').format('l')


const gmCal=(valueTY,valueLY)=>{

  if(valueTY==Infinity) valueTY=0
  if(valueLY==Infinity) valueLY=0

  if(Number(valueTY)&&Number(valueLY)) return (valueLY-valueTY)/valueLY
  else return 0

}

const isoF1056=f1056=>{

  let cc=''

  bb=f1056.toString()

  for(let i=0;i<3-bb.length;i++)  cc+='0'

  return cc+bb

}


const getQ=(d,f1056)=>{

  const aa=d2Range(d)

  const q={
    
    d:`select * from rpt_itm_d rpt where f254 between '${aa.d[0]}' and '${aa.d[1]}' and f1056='${f1056}'`,
    w:`select * from rpt_itm_w rpt where f254='${aa.w}' and f1056='${f1056}'`,

    itemInfo:`

      select obj.F01,F29,F22,F1132,dep.F03,iv.F64 F19,iv.F65 F1140,iv.F67 F30,pos.F04 from obj_tab obj
      left join ( select f01,f04 from (select *, row_number() over (partition by f01 order by f04) row_number from pos_tab) rows where row_number = 1) pos on obj.f01=pos.f01
      left join sdp_tab sdp on sdp.f04=pos.f04
      left join dept_tab dep on dep.f03=sdp.f03
      left join rpt_itm_iv iv on iv.f01=obj.f01 and f1056='${f1056}'

    `,
    tlz:`select f1034,f1710 from tlz_tab where f1710 like '%8501'`,
    lp:`select * from rpt_itm_d rpt where f254>='${f10562Ls(f1056)}' and f1056='${f1056}' and f1034=8201 and f65>0 order by f254 desc


  `

  }

  return q

}

const calcInv=(values,f1056,f01)=>{

  mock=Array.from(values)

  mock[0]=mock[0].filter(x=>x.F1056==f1056).filter(x=>x.F01==f01)
  mock[1]=mock[1].filter(x=>x.F1056==f1056).filter(x=>x.F01==f01)

  const getTlz=keyword=>mock[3].filter(x=>x.f1710.includes(keyword)).map(x=>x.f1034)

  const perp=lib.sumup(mock[1].filter(x=>x.F1034==8450),'F64')

  const positive=lib.sumup(mock[0].filter(x=>getTlz('+8501').includes(x.F1034)),'F64')
  const negative=lib.sumup(mock[0].filter(x=>getTlz('-8501').includes(x.F1034)),'F64')

  return perp+positive-negative

}

const goPromise=(d,f1056,callback)=>{

  const q=getQ(d,f1056)

// console.log(q)
// lib.json2txt('qqq',q)
  const promise=[

    new Promise((resolve,reject)=>lib.sqlQuery(lib.ipdi,q.d,resolve)),
    new Promise((resolve,reject)=>lib.sqlQuery(lib.ipdi,q.w,resolve)),
    new Promise((resolve,reject)=>lib.sqlQuery(lib.ipdi,q.itemInfo,resolve)),
    new Promise((resolve,reject)=>lib.sqlQuery(lib.host,q.tlz,resolve)),
    new Promise((resolve,reject)=>lib.sqlQuery(lib.ipdi,q.lp,resolve))
  ]

  Promise.all(promise).then(callback)

}

const f01ToRow=(values,f1056,f01)=>{

  const aa=values[2].find(x=>x.F01==f01)

// const ff=values[2].filter(x=>x.F01==f01)
//   if(f01==19219) console.log(ff)


  if(!aa) return

  const count=calcInv(values,f1056,f01)

  const row=[]

  row[0]=aa.F01
  row[1]=`${aa.F29} ${aa.F22}`
  row[2]=aa.F19
  row[3]=count/aa.F19
  row[4]=count

  row[7]=aa.F1140
  row[8]=aa.F1140*count  

  row[9]=aa.F30
  row[10]=aa.F30*count

  let lp=0
  const bb=values[4].filter(x=>x.F01==f01)

  if(bb.length) lp=bb[0].F65/bb[0].F64

  row[5]=lp
  row[6]=lp*count

  let gmValue

  if(row[6]) gmValue=row[6]
  else gmValue=row[8]

  row[11]=gmCal(gmValue,row[10])

  const prop={}

  ;['F1132','F03','F04'].forEach(x=>prop[x]=aa[x])

  return {row,prop}


}

const writeProgress=(user,v)=>fs.writeFileSync(`ivLog/${user}`,v)


const f01List=values=>lib.uniCol([values[0],values[1]].flat(),'F01')

const big=(values,f1056,user,res)=>{

  //values.forEach((x,i)=>console.log(x.length))

  //lib.t('')

  // const dd=1500
  // let aa=f01List(values).splice(0,dd)

  let aa=f01List(values)

  //aa=['0000000019363','0000000019374']

  const rows=[]

  aa.forEach((x,i)=>{

    const bb=i%50
    const cc=i/aa.length

    if(!bb) writeProgress(user,cc.toString())

    const row=f01ToRow(values,f1056,x)

    if(row) rows.push(row)

  })

  writeProgress(user,'1')


  setTimeout(()=>writeProgress(user,'0'),2000)

  //console.log(rows)

  //lib.t('')

  if(res) res.send(rows)
  
}


lib.txt2json('export/mock',values=>{

 //big(values,'003','liang')

})


const writeMock=()=>{

  goPromise('12/1/2021','003',values=>{
    lib.json2txt('export/mock',values)
  })

}

const testPromise=()=>{

  goPromise('12/1/2021','003',values=>{
    big(values,'003','liang')
  })

}


//testPromise()
//writeMock()

app.post('/iv',upload.fields([]),(req,res)=>{
  //lib.t('')

  writeProgress(req.body.user,'0')

  goPromise(req.body.d,req.body.f1056,values=>{

    big(values,req.body.f1056,req.body.user,res)

  })

})


const httpsport=3003
const httpport=3013

console.log(`dev.js is listening https port ${httpsport}`)
console.log(`dev.js is listening http ${httpport}`)
httpsServer.listen(httpsport)
httpServer.listen(httpport)
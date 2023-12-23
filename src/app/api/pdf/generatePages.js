export default function generatePages(page,value){
    let arr=[]
    if(value=="even"){
        for(let i=0;i<page;i++){
            if(i%2==0){
                arr.push(i)
            }
        }
    }else if(value=="odd"){
         for(let i=0;i<page;i++){
            if(i%2!=0){
                arr.push(i)
            }
        }
    }else{
        let stringArr=value.split(",")
        console.log(stringArr)
        stringArr.forEach((item)=>{
            if(item.length>1){
                start=item[0]
                end=item[2]
                for(i=start;i<=end;i++){
                    arr.push(i)
                }
            }else{
                arr.push(item)
            }
        })
    }
    return arr
  }
  
  
  
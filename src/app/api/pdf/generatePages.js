export default function generatePages(page, value) {
    console.log(page);
    let arr=[]
    if(value=="even"){
        for(let i=1;i<=page+1;i++){
            if(i%2==0){
                arr.push(i)
            }
        }
    }else if(value=="odd"){
         for(let i=1;i<=page+1;i++){
            if(i%2!=0){
                arr.push(i)
            }
        }
    }else{
        let stringArr = value.split(",")
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
  
  
  
import { memo, useCallback, useMemo, useState } from "react";

function App(){
  const [val,setVal] = useState(50);
  const[memoVal,setMemoVal] = useState(50);

  let total = useMemo(()=>{
    //this will be called only once, if it was normal fn called again annd again
    console.log("checking use memo")
    let sum = 0;
     for(let i=0;i<memoVal;i++){
      sum+=i;
    }
    return sum;//it actually return value
  },[memoVal]);

  function noUseMemoFn(){
    console.log("checking not use memo")
    let sum = 0;
     for(let i=0;i<memoVal;i++){
      sum+=i;
    }
    return sum;
  }
 
  //now to avoid re-rendering of this same functiond we'll use useCallback since it changes reference
  // function callbackFunction(){
  //   console.log("callback function");
  //   let sum = 0;
  //    for(let i=0;i<memoVal;i++){
  //     sum+=i;
  //   }
  //   return sum;
  // }
  const callbackFunction = useCallback(()=>{
    console.log("callback function");
    let sum = 0;
     for(let i=0;i<memoVal;i++){
      sum+=i;
    }
    return sum;
  },[])

  return(
    <>
      {/* <p>total value useMemo {noUseMemoFn()}</p> */}
      <p>total value useMemo {total}</p>
      <Dummy/>
      <UseCallbackFn fxn = {callbackFunction}/>
      <button onClick={()=>{setVal(Math.random())}}>change value</button>
    </>
  )
}

//we need to add memo here so if fxn changes only then it re-renders
//but fxn will change everytime since it is a reference so we make sure that if value inside
//is same it does not re-render for that we use useCallback
const UseCallbackFn= memo(({fxn})=>{
  return(
    <div>{fxn()}</div>
  )
});

const Dummy = memo(()=>{
  console.log("dummy");
  return(
    <p>inside memo</p>
  )
});
export default App;
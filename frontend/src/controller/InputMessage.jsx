import { Smile } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import messagestore from '../store/message';

function InputMessage({mucherid,userid}) {
    const [showEmoji,setemoji]=useState(false);
    const [widthscreen,setwidthsecreen]=useState(window.innerWidth)
    const [loadding,setLoadding]=useState(false)
    const [message,setmessage]=useState("");
    const emojiref=useRef()
    const smileref=useRef()

    const {SendMessage}=messagestore()

useEffect(()=>{
    function Resize(){
        setwidthsecreen(window.innerWidth)
    }
    window.addEventListener('resize',Resize)

    return ()=> removeEventListener('resize',Resize);
},[])
    useEffect(()=>{
        function mouseClick(e){
            if(emojiref.current && !emojiref.current.contains(e.target) && !smileref.current.contains(e.target)){
                setemoji(false)
            }
        }
        document.addEventListener('mousedown',mouseClick)
        return ()=> removeEventListener('mousedown',mouseClick)
    },[])

   async function sendMessage(e){
        e.preventDefault();
        
        setLoadding(true)

        if(message.trim()){
           
            await SendMessage(mucherid,message,userid)

        }

        setLoadding(false)
        setmessage('')
    }
  return (
    <div >
        <form onSubmit={sendMessage} className='relative flex  bg-white shadow-md shadow-gray-400  '>

            <Smile className='absolute top-1/2 -translate-y-1/2 left-2 text-gray-400 cursor-pointer' onClick={()=> setemoji(!showEmoji)} ref={smileref}/>
          <input type="text" name="message" id="message"  placeholder='Type a message '  className='flex-grow border-2 border-pink-500 rounded-l-md  p-2  pl-10  outline-none' onChange={(e)=> setmessage(e.target.value)} value={message}/>
          <button type="submit" className='bg-pink-500 border-2 border-pink-500  text-white px-2 rounded-r-md' >Send</button>

  {showEmoji &&<div className='absolute bottom-14 z-50 h-200' ref={emojiref}>
  <EmojiPicker onEmojiClick={(emoji)=> setmessage((pre)=> pre+emoji.emoji)} width={widthscreen <=400 && 230} />
  </div>}
          
        </form>
    </div>
  )
}

export default InputMessage
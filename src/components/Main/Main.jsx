import React, { useContext , useEffect } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


const Main = () => {


    const {onSent,recentPrompt,showResult,loading,resultData,setinput,input}=useContext(Context);
   
    const startListening = ()=> SpeechRecognition.startListening({ continuous: true , language:'en-IN'});
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    useEffect(() => {
        setinput(transcript);
      }, [transcript, setinput]);

      
    if (!browserSupportsSpeechRecognition) {
        return null
      }

  return (
    <div className='main'>
        <div className="nav">
            <p>Chit-Chat 😉</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">

            {!showResult?
             <>
             <div className="greet">
             <p><span>Hukum mere aaka!</span></p>
             <p> Mai aapki kis prakaar madad kru?</p>
         </div>
         <div className="cards">
             <div className="card">
                 <p>Suggest some beautiful places to visit in your Heart 😘</p>
                 <img src={assets.compass_icon} alt="" />
             </div>
             <div className="card">
                 <p>Kya tumhare toothpaste m bhi namak h?🙃</p>
                 <img src={assets.bulb_icon} alt="" />
             </div>
             <div className="card">
                 <p>How to get 10 spi and 1CR+ package? 😜😁</p>
                 <img src={assets.message_icon} alt="" />
             </div>
             <div className="card">
                 <p>ChatGpt acha h ya tum??🧐</p>
                 <img src={assets.code_icon} alt="" />
             </div>
         </div>
         </> :
         <div className='result'>
            <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading?
                <div className='loader'>
                    <hr />
                    <hr />
                    <hr />
                </div>
                :   <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                }
             
            </div>
         </div> }
           
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setinput(e.target.value)} value={input} type="text" placeholder='Enter your text' />
                    {/* <div className="input">{transcript}</div> */}
                    <div>
                        <img onClick={SpeechRecognition.stopListening} src={assets.mute_icon} alt="" />
                        <img onClick={startListening} src={assets.mic_icon} alt="" />
                        <img onClick={()=>onSent()} src={assets.send_icon} alt="" />
                    </div>
                </div>
                <p className="bottom-info">
                  Gemini may display inaccurate info, including about people, so double check its responses. Your privacy and Gemini Apps
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main
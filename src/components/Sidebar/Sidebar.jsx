import React, { useContext, useState, useTransition } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/Context';

const Sidebar = () => {

    const [extended, setextended] = useState(false);
    const {onSent,prevPrompt,setrecentPrompt,newChat} = useContext(Context);

    const loadPrompt = async (prompt) =>{
        setrecentPrompt(prompt)
        await onSent(prompt)
    }

  return (
    <div className='sidebar'>
        <div className="top">
            <img onClick={()=>{
                return setextended(!extended) 
            }} className='menu' src={assets.menu_icon} alt="" />
            <div onClick={()=>{newChat()}} className="new-chat">
                <img src={assets.plus_icon} alt="" />
               {extended?<p>New Chat 🤗</p>:null} 
            </div>

            {extended?
              <div className="recent">
              <p className="recent-title">Recent</p>
              {prevPrompt.map((item,index)=>{
                    return (
                        <div onClick={()=>{
                            loadPrompt(item)
                        }} key={index} className="recent-entry">
                        <img src={assets.message_icon} alt="" />
                        <p>{item.slice(0,18)} ...</p>
                    </div>
                    )
              })}
             
          </div>
          
          :null
            }
          
        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <a href="https://gemini.google.com/faq?utm_source=google&utm_medium=cpc&utm_campaign=2024enIN_gemfeb&gad_source=1&gclid=Cj0KCQjwkdO0BhDxARIsANkNcresM2tw17IXYvqj4TZF0Y42wecnIibhDmK78loHE-vcm06P7dScmv4aArN2EALw_wcB"></a>
                <img src={assets.question_icon} alt="" />
               {extended?<p>Help 🙄</p>:null} 
            </div>
            <div className="bottom-item recent-entry">
                <a href="https://gemini.google.com/app?utm_source=google&utm_medium=cpc&utm_campaign=2024enIN_gemfeb&gad_source=1&gclid=Cj0KCQjwkdO0BhDxARIsANkNcresM2tw17IXYvqj4TZF0Y42wecnIibhDmK78loHE-vcm06P7dScmv4aArN2EALw_wcB"></a>
                <img src={assets.gemini_icon} alt="" />
                {extended?<p>Real Gemini</p>:null} 
            </div>
          
        </div>
    </div>
  )
}

export default Sidebar
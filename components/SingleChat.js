import React from 'react'
import Styles from "./styles/layout.module.scss"
import { GrAttachment } from "react-icons/gr";
import { FiMic } from "react-icons/fi";
import { AiOutlineSend } from "react-icons/ai";

function SingleChat() {
    return (
        <div className={Styles.chatWrapper}>
            <div className={Styles.chatBox}>
            </div>
            <div className={Styles.chatInput}>
                <div>
                    <GrAttachment />
                </div>
                <form>
                    <input type="text" placeholder='Start typing your messages' />
                    <button type="submit"><AiOutlineSend  className={Styles.sendIcon}/></button>
                </form>

                <div>
                    <FiMic />
                </div>
            </div>

        </div>

    )
}

export default SingleChat
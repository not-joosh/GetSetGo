import { useEffect, useState } from "react";
import { faqIcon } from "../../assets/config";
import { useModal } from "../../hooks/useModal";
import { onSnapshot, query } from "firebase/firestore";
import { faqRef } from "../../store/firebaseConfig";
export const FAQModal = () => {
    const [faqList, setFaqList] = useState();
    const {closeFAQ} = useModal();

    useEffect(() => {
        const unsubscribe = onSnapshot(query(faqRef), (snapshot) => {
            const faqList = [];
            snapshot.forEach((doc) => {
                faqList.push({id: doc.id, ...doc.data()})
            });
            setFaqList(faqList);
        });
        return () => unsubscribe();
    }, []); 


    return (
        <>
            <div id="faqPanel" className ="sidepanel">
                <a href="javascript:void(0)" className ="closebtn" onClick={() => {closeFAQ()}}>&#215;</a>
                <img className ="faq-sidepanel" src= {faqIcon} />
                <h1>FAQ</h1>
                {faqList && faqList.map((faqObj) => {
                    return (
                        <>
                            <div className ="questions">
                                <a>&#8226; {faqObj.question}</a>
                            </div>
                            <div className ="answers">
                                <div>
                                    <a>{faqObj.answer}</a>
                                </div>
                            </div>
                        </>
                    );
                })}
            </div>
        </>
    );
};
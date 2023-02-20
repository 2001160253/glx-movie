import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Payment.css'

export default function Payment() {

    const navigate = useNavigate();
    
    const handleRegisterPayment = () => { navigate(`/PayBankCard`) }

    const [BankId, setBankId] = useState()
    const [CardNumber, setCardNumber] = useState("")
    const [CardName, setCardName] = useState("")
    const [ExpireDate, setExpireDate] = useState("")
    const [CVV, setCVV] = useState("")
    const [Balance, setBalance] = useState(0)

    const handle = async() => {
        if (BankId === "") {
          toast.warn("Chưa nhập BankId!");
          return;
        }
        if (CardNumber === "") {
          toast.warn("Chưa nhập CardNumber!");
          return
        }
        if (CardName === "") {
            toast.warn("Chưa nhập CardName!");
            return
          }
        if (ExpireDate === "") {
            toast.warn("Chưa nhập ExpireDate!");
            return
          }
        if (CVV === "") {
            toast.warn("Chưa nhập CVV!");
            return
          }
        if (Balance === "") {
            toast.warn("Chưa nhập Balance!");
            return
          }
        else{
          try {
              const res = await fetch("https://vietcpq.name.vn/U2FsdGVkX18VmUfb3R34rkA11q59f+dY6kr6oyXqCbg=/Bank/BankCard", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  BankId: BankId*1,
                  CardNumber: CardNumber,
                  CardName:CardName,
                  ExpireDate:ExpireDate,
                  CVV: CVV,
                  Balance:Balance*1
                }),
              })
    
              const json = await res;
                toast.success("success")
                setTimeout(() => {
                  navigate('/film')
              }, 2000);
    
            } catch (error) {
              toast.error("Sai thông tin hoặc chưa nhập đầy đủ thông tin, mời nhập lại");
            }
        }
      };
  

    return (
        <div>
            <div className='container'>
                <div className='paymentMain'>
                    <ToastContainer />
                    <form className='paymentMain_form' >
                        <div className='paymentMain_TT'>
                        <h2 className=' '>Tạo tài khoản Ngân hàng</h2>
                            <div className='listInput'>
                                <p>BankId</p>
                                <input
                                type="text"
                                placeholder="BankId nhập 1 hoặc 2 "
                                value={BankId} onChange={(e) => setBankId(e.target.value)}/>
                            </div>
                            <div className='listInput'>
                                <p>CardNumber</p>
                                <input
                                 type="text"
                                 placeholder="CardNumber"
                                 value={CardNumber} onChange={(e) => setCardNumber(e.target.value)}/>
                            </div>
                            <div className='listInput'>
                                <p>CardName</p>
                                <input
                                type="text"
                                placeholder="CardName"
                                value={CardName} onChange={(e) => setCardName(e.target.value)}/>
                            </div>
                            <div className='listInput'>
                                <p>ExpireDate</p>
                                <input
                                type="text"
                                placeholder="ExpireDate"
                                value={ExpireDate} onChange={(e) => setExpireDate(e.target.value)}/>
                            </div>
                            <div className='listInput'>
                                <p>CVV</p>
                                <input
                                type="text"
                                placeholder="CVV"
                                value={CVV} onChange={(e) => setCVV(e.target.value)}/>
                            </div>
                            <div className='listInput'>
                                <p>Balance</p>
                                <input
                                type="text"
                                placeholder="Balance"
                                value={Balance} onChange={(e) => setBalance(e.target.value)}/>
                            </div>
                            <div className='listInput'>
                                <p></p>
                                <button className=''>Áp dụng</button>
                            </div>
                            <div className=''>
                                (*) Bằng việc click vào THANH TOÁN, bạn đã xác nhận hiểu rõ các Quy định
                                Giao dịch Trực tuyến của chúng tôi.
                            </div>
                            <div className=''>
                                <div className='listInput-TT'>
                                    <button type='button' onClick={handleRegisterPayment} className="btn btn-secondary">Quay lại</button>
                                    <button type='button' onClick={handle} className="btn btn-primary">Tạo tài khoản ngân hàng</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

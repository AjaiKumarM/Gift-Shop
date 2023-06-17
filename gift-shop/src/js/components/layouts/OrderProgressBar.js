import { Fragment } from "react";

export default function OrderProgressBar({address,confirm,payemnt,success}) {
  return (
    <Fragment>
      <div className="con">
        <div className="progress-con">
          <div className="progress-sc">
            <div className={`percent-sc ${confirm ? 'w-50' :""} ${payemnt ? "w-100" : ""}`}></div>
          </div>
          <div className="steps-sc">
            <div className={`step-sc ${address ? "selected-sc":""} ${confirm ? "completed-sc" :''}`} id="0">{confirm ? (<i className="fi fi-rs-map-marker-check"></i>):(<i className="fi fi-rs-marker"></i>)}</div>
            <div className={`step-sc ${confirm ? "selected-sc":""} ${payemnt ? "completed-sc" :''}`} id="1">{payemnt ? (<i className="fi fi-bs-box-check"></i>):(<i className="fi fi-br-box-heart"></i>)}</div>
            <div className={`step-sc ${payemnt ? "selected-sc":""} ${success ? "completed-sc progress-success" :''}`} id="2">{success ? (<i className="fi fi-rs-shield-check"></i>):(<i className="fi fi-rr-dollar"></i>)}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

import { Fragment } from "react";

export default function UserOrderTem({ order }) {
  return (
    <Fragment>
      {order &&
        order.orderItems.map((item,i) => {
          return (
            <div key={i} className="card shadow-0 border mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-2">
                    <img
                      src={item.image}
                      className="img-fluid"
                      alt="Phone"
                    />
                  </div>
                  <div className="col-md-5 d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0">{item.name}</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small">Qty: {item.quantity}</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small">${item.price}</p>
                  </div>
                </div>
                <hr
                  className="mb-4"
                  style={{ backgroundColor: "#e0e0e0", opacity: "1" }}
                />
                <div className="row d-flex align-items-center">
                  <div className="col-md-2">
                    <p className="text-muted mb-0 small">Track Order</p>
                  </div>
                  <div className="col-md-10">
                    <div
                      className="progress"
                      style={{ height: "6px", borderRadius: "16px" }}
                    >
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${order.orderStatus.includes("Processing")? 20 :(order.orderStatus.includes("Delivered")?100:50)}%`,
                          borderRadius: "16px",
                          backgroundColor: `#484385`,
                        }}
                        aria-valuenow="65"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div className="d-flex justify-content-around mb-1">
                    <p className="text-muted mt-1 mb-0 small ms-xl-5">
                        Processing
                      </p>
                      <p className="text-muted mt-1 mb-0 small ms-xl-5">
                        Out for delivery
                      </p>
                      <p className={`mt-1 mb-0 small ms-xl-5 ${order.orderStatus.includes('Delivered')?"bg-light-green px-3 rounded-pill text-dark-green":"text-muted "}`}>
                        Delivered
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </Fragment>
  );
}

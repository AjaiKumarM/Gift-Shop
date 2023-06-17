import { useState } from "react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { FilterMenuChange } from "../../slices/NavbarSlices";
import { useNavigate } from "react-router-dom";

export default function FilterSilder({ toggler }) {

    const[minPrice,setMinPrice] = useState(0);
    const[maxPrice,setMaxPrice] = useState(1000);

    const dispatch = useDispatch();
    const navigate = useNavigate();
  const categoryArray = [
    "Accessories",
    "Cards",
    "Clothing",
    "Jewelries",
    "Handbages",
    "Toys",
    "Wallets",
  ];

  const FilterApplly = (e)=>{
    e.preventDefault();
    dispatch(FilterMenuChange(false))
    navigate(`/product/filter/${minPrice}-${maxPrice}`)
    
  }
  return (
    <Fragment>
      <div className={`filtersilder ${toggler ? "filtersilder-active" : ""}`}>
        <div className="filter-price">
          <div className="row">
            <div className="col-11 filter-price-content">
              <h6>Filter by Price</h6>
              <i onClick={()=>dispatch(FilterMenuChange(false))} className="bi bi-x bg-blue"></i>
            </div>
          </div>
          <form onSubmit={FilterApplly}>
            <div className="row">
              <div className="col-11">
                <div className="filter-range">
                  <p>Min Price</p>
                  <div className="filter-range-slider">
                    <span>$0</span>
                    <input type="range" min={0} max={1000} value={minPrice}  onChange={(e)=>setMinPrice(e.target.value)} />
                    <span>$1000</span>
                  </div>
                  <span>${minPrice}</span>
                </div>
                <div className="filter-range">
                  <p>Max Price</p>
                  <div className="filter-range-slider">
                    <span>$0</span>
                    <input type="range" min={0} max={1000} value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)}/>
                    <span>$1000</span>
                  </div>
                  <span>${maxPrice}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-2"></div>
              <div className="col-3">
                <input className="btn-sc-primary-outline px-3" type="reset" value="Reset" onClick={()=>{setMaxPrice(1000);setMinPrice(0)}} />
              </div>
              <div className="col-3 ms-4">
                <button className="btn-sc-primary rounded-pill px-3" type="submit">Apply</button>
              </div>
            </div>
          </form>
        </div>
        <div className="filter-categories">
            <div className="row">
                <div className="col-11">
                    <h6>Filter by categories</h6>
                </div>
                <ul className="category-list">
                    {categoryArray.map(cat=>(
                        <li onClick={()=>navigate(`/product/filter/category/${cat}`)} className="category-list-item" key={cat}>{cat}</li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    </Fragment>
  );
}

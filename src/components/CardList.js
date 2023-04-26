import React from 'react';
import './cardlist.css';

function CardList() {
  return (
    <div className="card-list">
      <div className="row">
        <div style={{ display:'flex', marginTop:'3%' }}>
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
          <div className="card blue">
            <div className="title">all projects</div>
            <div className="value">89</div>
            <div className="stat"><b>13</b>% increase</div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
          <div className="card green">
            <div className="title">team members</div>
            <div className="value">5,990</div>
            <div className="stat"><b>4</b>% increase</div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
          <div className="card orange">
            <div className="title">total budget</div>
            <div className="value">$80,990</div>
            <div className="stat"><b>13</b>% decrease</div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
          <div className="card red">
            <div className="title">new customers</div>            
            <div className="value">3</div>
            <div className="stat"><b>13</b>% decrease</div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default CardList;

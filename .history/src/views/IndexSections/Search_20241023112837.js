import React from "react";
import styles from "./Search.module.css";

export default function Search() {
  return (
    <div>
      <div
        className={`${styles["banner-text"]} ${styles.booking_ul_new} wow fadeIn`}
        data-wow-duration="1s"
        data-wow-delay="1s"
      >
        <div className="col-md-12">
          <form>
            <ul className="d-flex booking_ul">
              <li>
                <div class="form-group">
                  <label for="exampleFormControlSelect1">City</label>
                  <select class="form-control" id="exampleFormControlSelect1">
                    <option>Dharamshala</option>
                    <option>Shimla</option>
                    <option>Manali</option>
                    <option>Kashmir</option>
                    <option>Goa</option>
                  </select>
                </div>
              </li>

              <li>
                <div class="form-group">
                  <label for="exampleFormControlSelect2">Hotel</label>
                  <select class="form-control" id="exampleFormControlSelect2">
                    <option>Mount View</option>
                    <option>Nature valley</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </li>

              <li>
                <div class="form-group">
                  <label for="example-datepicker">Choose a date</label>
                  <input class="form-control" type="date"></input>
                </div>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
}

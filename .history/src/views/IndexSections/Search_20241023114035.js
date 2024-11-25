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
        <div className="bg-white col-md-12">
          <form>
            <ul className="form-row booking_ul">
              <li className="col-md-2 mb-3">
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

              <li className="col-md-2 mb-3">
                <div class="form-group">
                  <label for="exampleFormControlSelect2">Hotel</label>
                  <select class="form-control" id="exampleFormControlSelect2">
                    <option>Mount View</option>
                    <option>Nature valley</option>
                    <option>5star</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </li>

              <li className="col-md-2 mb-3">
                <div class="form-group">
                  <label for="example-datepicker">Check in</label>
                  <input class="form-control" type="date"></input>
                </div>
              </li>

              <li className="col-md-2 mb-3">
                <div class="form-group">
                  <label for="example-datepicker">Check Out</label>
                  <input class="form-control" type="date"></input>
                </div>
              </li>

              <li className="col-md-1 mb-3">
                <div class="form-group">
                  <label for="exampleFormControlSelect1">Rooms</label>
                  <select class="form-control" id="exampleFormControlSelect1">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </li>

              <li className="col-md-1 mb-3">
                <div class="form-group">
                  <label for="exampleFormControlSelect1">Adult</label>
                  <select class="form-control" id="exampleFormControlSelect1">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </li>

              <li className="col-md-1 mb-3">
                <li>
                  <div class="form-group">
                    <label for="exampleFormControlSelect1">children</label>
                    <select class="form-control" id="exampleFormControlSelect1">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                </li>
              </li>
              <li className="col-md-1 mb-3">
                <button class="btn btn-primary" type="submit">
                  Submit form
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
}

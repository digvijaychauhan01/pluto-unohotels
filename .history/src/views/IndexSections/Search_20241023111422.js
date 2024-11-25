import React from "react";
import styles from "./Search.module.css";

export default function Search() {
  return (
    <div>
      <form>
        <div class="form-group">
          <label for="exampleFormControlSelect1">Example select</label>
          <select class="form-control" id="exampleFormControlSelect1">
            <option>Dharamshala</option>
            <option>Shimla</option>
            <option>Manali</option>
            <option>Kashmir</option>
            <option>Goa</option>
          </select>
        </div>
      </form>
    </div>
  );
}

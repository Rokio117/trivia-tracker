import React from "react";

export const loader = {
  displayLoading(loading) {
    //gets sent this.state.loading
    if (loading) {
      return <div className="loader"></div>;
    }
  }
};

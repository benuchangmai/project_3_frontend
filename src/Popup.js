import React from 'react'

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
        <button className='popup_click' onClick={this.props.closePopup}>New message(s)</button>
        </div>
      </div>
    );
  }
}
export default Popup
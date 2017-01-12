import React from 'react'
import { Button } from 'semantic-ui-react'

  export default function(icon){
      if(!icon) icon = "info";
      let iconClass = "icon " + icon;
    return(
      <Button className="circular ui icon button">
        <i className={iconClass}></i>
      </Button>
    )
  }
import React from 'react'
import Avatar  from '@mui/material/Avatar';
import user from '../../../../src/assets/img/user.png';
import { PropTypes } from 'prop-types';

const AvatarComponent = ({src, width, height, variant}) => {
  return (
    <div>
         <Avatar alt="Remy Sharp" src={src} sx={{ width: width, height: height }} variant={variant} />
    </div>
  )
}

export default AvatarComponent;

AvatarComponent.propTypes ={
width: PropTypes.number,
height: PropTypes.number,
src: PropTypes.any,
variant: PropTypes.string

}
AvatarComponent.defaultProps = {
width: 100,
height: 100,
src: user,
variant: '' //square, rounded
}


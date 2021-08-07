import React from 'react';

import SearchIcon from '@material-ui/icons/Search';

import classes from './style.module.scss';

export default function SearchBar({ style, value, placeholder,onChange, ...props}) {
  return (
    <div className={classes.search} style={{ ...style }}>
      <SearchIcon style={{ color: '#fff', margin: '5px 0', marginLeft:'15px', width:'20px', height:'20px', background:'#131315' ,mixBlendMode: 'normal'}} />
      <input type='text' value={value} onChange={onChange} placeholder={placeholder} required className={classes.search} {...props} />
    </div>
  );
}

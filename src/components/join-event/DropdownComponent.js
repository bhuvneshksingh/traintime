// import React, { Component } from 'react'
// // import InputLabel from '@material-ui/core/InputLabel'
// // import MenuItem from '@material-ui/core/MenuItem'
// // import FormControl from '@material-ui/core/FormControl'
// // import Select from '@material-ui/core/Select'
// // import NativeSelect from '@material-ui/core/NativeSelect'
// import InputBase from '@material-ui/core/InputBase'
// import TextField from '@material-ui/core/TextField'
// import Autocomplete from '@material-ui/lab/Autocomplete'
// import { findUserByEmail } from '../../utils/api/user'
// import { CircularProgress } from '@material-ui/core/CircularProgress'
// import { string } from 'prop-types'
// import validator from 'validator'
// import Avatar from '@material-ui/core/Avatar'
// import { flexbox } from '@material-ui/system'

// export default class FindUserByEmail extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       options: [],
//       loading: false,
//     }
//   }

//   onOpen = () => {console.log('onOpen text')}

//   onClose = event => {}

//   onUserEmailChangeType = event => {
//     const email = event.target.value
//     if (validator.isEmail(email))
//       findUserByEmail(email, this.props.locale).then(response => {
//         console.log(response)
//         if (response.status === 200)
//           this.setState({ options: [response.payload, response.payload] })
//       })
//     console.log(email)
//     return email
//   }
//   onOptionClick=(event)=> {
//     console.log(event.target.value);
//   }

//   render() {
//     return (
//       <Autocomplete
//       onChange={this.onOptionClick}

//         id="asynchronous-demo"
//         style={{ width: 300 }}
//         open={true}
//         onOpen={this.onOpen}
//         onClose={this.onClose}
//         getOptionLabel={option => option.fullName}
//         options={this.state.options}
//         loading={this.state.loading}

//         renderOption={option => (
//           <div className="invitation-item"
//           style={{display:'flex', alignItems:'center'}}>
//             <Avatar src={option.avatarPhoto.url} />
//             <span
//             style={{marginLeft: '12px'}}>{option.fullName}</span>
//           </div>
//         )}
//         renderInput={params => (
//           <TextField
//             {...params}
//             label="Asynchronous"
//             fullWidth
//             variant="outlined"
//             onChange={this.onUserEmailChangeType}
//             InputProps={{
//               ...params.InputProps,
//               endAdornment: (
//                 <React.Fragment>
//                   {this.state.loading ? (
//                     <CircularProgress color="inherit" size={20} />
//                   ) : null}
//                   {params.InputProps.endAdornment}
//                 </React.Fragment>
//               ),
//             }}
//           />
//         )}
//       />
//     )
//   }
// }

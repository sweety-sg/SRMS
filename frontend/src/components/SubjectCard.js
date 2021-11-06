import { Icon } from '@iconify/react';
import bugFilled from '@iconify/icons-ant-design/bug-filled';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import '@material-ui/core/styles';
import './style.css'
// utils
// import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------
const combination=["#eae4e9","#fff1e6","#bee1e6","#fde2e4","#f0efeb","#fad2e1","#e2ece9","#dfe7fd"]
const darkvers=["#644e61","#b34f00","#23555c","#a40f19","#494537","#730d33","#324d45","#051748"]
const mid=["#f4f1f3","#fdf5ed","#edf6f8","#fbeeef","#f3f3f1","#fce8f0","#f0f5f3","#eef2fb"]


const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.dark,
//   backgroundColor: combination[0]
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.error.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
    theme.palette.error.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------


export default function SubjectCard(props) {
  console.log(props.isExam)
    const i = props.obj.id%8
    const j=Math.floor(Math.random() * 8)
  return (
    <RootStyle style={{backgroundColor: combination[i], color: darkvers[i]}} className="pop">
      {/* <IconWrapperStyle>
        <Icon icon={bugFilled} width={24} height={24} />
      </IconWrapperStyle> */}
      {!props.isExam &&
      <>
      <Typography variant="h3">{props.obj.code}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {props.obj.name}
      </Typography>
      </>
}
{props.isExam &&
      <>
      <Typography variant="h3">{props.obj.name}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {props.obj.date}
      </Typography>
      </>
}
    </RootStyle>
  );
}
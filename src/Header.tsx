import React from "react";
import { styled } from "styled-components";
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

const HeadWrap = styled.div`
  display: flex;
  align-items: right;
  justify-content: right;
`

const IconBox = styled.div`
  background-color: ${props => props.theme.boxColor};
  box-shadow: 0px 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
  margin-top: 10px;
  margin-right: 20px;
  padding: 5px;
  border-radius: 50px;
  cursor: pointer;
  position: absolute;
`

const LightIcon = styled(LightModeIcon)`
  color: ${props => props.theme.textColor};
  font-size: 1.5rem !important;
`
const DarkIcon = styled(NightsStayIcon)`
  color: ${props => props.theme.textColor};
  font-size: 1.5rem !important;
`


function Header() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <>
      <HeadWrap>
        <IconBox onClick={toggleDarkAtom}>
          {isDark?<DarkIcon/>:<LightIcon/>}
        </IconBox>
      </HeadWrap>
    </>
  )
}

export default Header;
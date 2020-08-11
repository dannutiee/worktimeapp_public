import styled from 'styled-components';

const Alignment = styled.div`
  display: flex;
  width: ${props => (props.width ? props.width : '100%')};
  height: ${props => (props.height ? props.height : '100%')};
  flex-direction: ${props => (props.direction ? props.direction : 'row')};
  justify-content: ${props =>
    props.horizontal ? props.horizontal : 'space-between'};
  align-items: ${props => (props.vertical ? props.vertical : 'flex-start')};
`;

export default Alignment;

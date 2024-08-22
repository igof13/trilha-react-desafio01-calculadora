
import Input from './components/Input';
import Button from './components/Button';

import { Container, Content, Row } from './styles';
import { useState } from 'react';

const App = () => {
  const [currentNumber, setCurrentNumber] = useState('0');
  const [firstNumber, setFirstNumber] = useState('0');
  const [operation, setOperation] = useState('');

  const handleOnClear = () => {
    setCurrentNumber('0');
    setFirstNumber('0');
    setOperation('');
  };

  const handleAddNumber = (num) => {
    setCurrentNumber((prev) => `${prev === '0' ? '' : prev}${num}`);
  };

  const handleDot = () => {
    if (!currentNumber.includes('.')) {
      setCurrentNumber((prev) => `${prev}.`);
    }
  };

  const handleSquareNumbers = () => {
    const currentNum = Number(currentNumber);
  
    if (isNaN(currentNum)) {
        console.error('Invalid number input');
        return;
    }
  
    const squaredResult = currentNum ** 2;
    setCurrentNumber(String(squaredResult));
    setFirstNumber('0'); // Reset firstNumber since it's a standalone operation
    setOperation('');    // Clear the operation
  };
  

  const handleEquals = () => {
    if (firstNumber !== '0' && operation !== '' && currentNumber !== '0') {
      let result;

      switch (operation) {
        case '+':
          result = Number(firstNumber) + Number(currentNumber);
          break;
        case '-':
          result = Number(firstNumber) - Number(currentNumber);
          break;
        case '*':
          result = Number(firstNumber) * Number(currentNumber);
          break;
        case '/':
          result = Number(firstNumber) / Number(currentNumber);
          break;
        default:
          break;
      }

      setCurrentNumber(String(result));
      setFirstNumber('0');
      setOperation('');
    }
  };

  const handleOperation = (op) => {
    if (currentNumber !== '0') {
      if (firstNumber === '0') {
        setFirstNumber(currentNumber);
        setCurrentNumber('0');
      } else if (operation !== '') {
        handleEquals();  // Automatically calculate if an operation is already in progress
        setFirstNumber(currentNumber);
        setCurrentNumber('0');
      }
      setOperation(op);
    }
  };

  return (
    <Container>
      <Content>
        <Input value={currentNumber} />
        <Row>
          <Button label="x" onClick={() => handleOperation('*')} />
          <Button label="/" onClick={() => handleOperation('/')} />
          <Button label="C" onClick={handleOnClear} />
          <Button label="." onClick={handleDot} />
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber('7')} />
          <Button label="8" onClick={() => handleAddNumber('8')} />
          <Button label="9" onClick={() => handleAddNumber('9')} />
          <Button label="-" onClick={() => handleOperation('-')} />
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber('4')} />
          <Button label="5" onClick={() => handleAddNumber('5')} />
          <Button label="6" onClick={() => handleAddNumber('6')} />
          <Button label="+" onClick={() => handleOperation('+')} />
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber('1')} />
          <Button label="2" onClick={() => handleAddNumber('2')} />
          <Button label="3" onClick={() => handleAddNumber('3')} />
          <Button label="=" onClick={handleEquals} />
        </Row>
        <Row>
          <Button label="X²" onClick= {handleSquareNumbers} />
          <Button label="0" onClick={() => handleAddNumber('0')} />
        </Row>
      </Content>
    </Container>
  );
};

export default App;

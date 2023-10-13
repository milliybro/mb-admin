import { Carousel } from "antd";

const DashboardPage = () => {
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  return (
    <div>
      <h1>
      DashboardPage
      </h1>
      <h3>Our Center</h3>
      <Carousel autoplay>
    <div>
      <h3 style={{backgroundColor: '#fff', textAlign: 'center'}}>Kasblarni mutahhasislardan organing</h3>
    </div>
    <div>
    <h3 style={{backgroundColor: '#fff', textAlign: 'center'}}>Kasblarni onlayn organing</h3>
    </div>
    <div>
    <h3 style={{backgroundColor: '#fff', textAlign: 'center'}}>Kasblarni istalgan nuqtadan organing</h3>
    </div>
    <div>
    <h3 style={{backgroundColor: '#fff', textAlign: 'center'}}>Kasblarni (MilliyBro)dan organing</h3>
    </div>
  </Carousel>
    </div>
  )
}

export default DashboardPage
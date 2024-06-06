import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/Header'; // Assuming NavBar component exists
import Image1 from '../images/tut1.png.jpg'; // import your images
import Image2 from '../images/tut2.png.jpg';

const SupportPage = () => {
  return (
    <Wrapper>
      <NavBar /> {/* Assuming NavBar component handles navigation */}
      <MainContent>
        <Section>
          <SectionTitle>Title 1:</SectionTitle>
          <Content>
            <p>How to start making posts:</p>
            <ul>
              <li>Go to the login page with the login button in the nav bar</li>
              <li>After that, choose either to register or to login</li>
            </ul>
          </Content>
          <Image src={Image1} alt="How to start making posts" />
        </Section>
        <Section>
          <SectionTitle>Title 2:</SectionTitle>
          <Content>
            <p>When you are logged in, you will get transferred to your profile page where you can start making posts.</p>
            <p>To edit the posts you have made, you can scroll down to either choose to delete or edit your posts.</p>
          </Content>
          <Image src={Image2} alt="How to edit posts" />
        </Section>
        {/* Additional Sections can be added here */}
      </MainContent>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const MainContent = styled.div`
  margin-top: 30%; /* Adjusted margin to accommodate the header */
`;

const Section = styled.div`
  margin-bottom: 50px;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
`;

const Content = styled.div`
  margin-bottom: 30px;
  color: #666;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export default SupportPage;

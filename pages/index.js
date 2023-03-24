import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { baseUrl, fetchApi } from '../utils/fetchApi';

const Banner = ({
  purpose,
  title1,
  title2,
  imageUrl,
  linkName,
  buttonText,
  desc1,
  desc2,
}) => (
  <Flex flexWrap='wrap' alignContent='center' m='10' justifyContent='center'>
    <Image src={imageUrl} height={300} width={500} alt='banner' />
    <Box p='5'>
      <Text color='gray.500' fontSize='s' fontWeight='medium'>
        {purpose}
      </Text>
      <Text fontSize='3xl' fontWeight='Bold'>
        {title1} <br /> {title2}
      </Text>
      <Text paddingTop='3' paddingBottom='3' fontSize='s' color='gray.700'>
        {desc1} <b /> {desc2}
      </Text>
      <Button bg='blue.300' fontSize='xl' color='white'>
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);

export default function Home({ propertiesForRent, propertiesForSale }) {
  console.log(propertiesForRent, propertiesForSale);
  return (
    <Box>
      <h1>hello world</h1>
      <Banner
        purpose='RENT A HOME'
        title1='Rental Homes for'
        title2='Everyone'
        desc1='Explore Appartments, Villas, Homes'
        desc2='and more'
        buttonText='Explore Renting'
        linkName='/search?purpose=for-rent'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />
      <Flex flexWrap='wrap'>{/* fetch property and map over them.. */}</Flex>
      <Banner
        purpose='Buy A HOME'
        title1='Find Buy & Own Your'
        title2='Dream Home'
        desc1='Explore Appartments, Villas, Homes'
        desc2='and more'
        buttonText='Explore Buying'
        linkName='/search?purpose=for-sale'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />
    </Box>
  );
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );
  //   console.log(propertyForRent, propertyForSale);
  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}

import { styled, Box, Typography } from "@mui/material";

const Image = styled(Box)`
    width: 100%;
    background: url(https://t3.ftcdn.net/jpg/01/69/47/46/360_F_169474679_7WNLrYEw2qFTPu3Kgb2M8IQrXVGw7Uo5.jpg)
        center/55% repeat-x #000;
    background-repeat: no-repeat;
    background-size: cover;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    color: #ffffff;
    line-height: 1;
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    /* background: #ffffff; */
`;

const Banner = () => {
    return (
        <Image>
            <Heading>BLOGGY</Heading>
            <SubHeading>
                Discover. Inspire. Share. Your Ultimate Blogging Destination.
            </SubHeading>
        </Image>
    );
};

export default Banner;

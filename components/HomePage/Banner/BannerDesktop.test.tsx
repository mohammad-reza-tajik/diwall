import {it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import BannerDesktop from "./BannerDesktop";
import theme from "../../../styles/theme";
import {ThemeProvider} from "@mui/material/styles";


it("should render a heading and a paragraph and a link and an image", () => {

    render(
        <ThemeProvider theme={theme}>
            <BannerDesktop/>
        </ThemeProvider>
    );

    const heading = screen.getByRole("heading");
    const link = screen.getByRole("link");
    const paragraph = screen.getByText(/از بین هزاران طرح کاغذ و پوستر دیواری فروشگاه دیوال برای فضای خانه و محل کار خود انتخاب و به آسانی آنرا سفارشی کرده وآنلاین تحویل بگیرید/);
    const image = screen.getByRole("img");

    expect(image).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();

})
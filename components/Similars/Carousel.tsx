import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ContentInterface } from "@/pages/types";
import { FC, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ContentBox from "./Box";
import { Button } from "../Button/Button";

interface CarouselComponentProps {
  search: string
  getTrending: () => void
  source: string
  url: string
  content: ContentInterface[]
}

export const CarouselComponent: FC<CarouselComponentProps> = ({ search, getTrending, content, source, url }) => {
  const [currentSlide, setCurrent] = useState(0)
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])


  return (
    <>
      <Carousel
        className="w-full px-10 py-6"
        opts={{
          align: "center",
        }}
        setApi={setApi}
      >
        <CarouselContent>
          {content?.map((data: ContentInterface) => (
            <ContentBox key={data.id} content={data} source={source} url={url} />
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-6 md:left-0" variant="secondary" />
        <CarouselNext className="right-6 md:right-0" variant="secondary" />
      </Carousel>
      <div className="text-center text-sm text-purple font-semibold text-muted-foreground">
        {currentSlide} / {content.length}
      </div>
      {search === "trends" && (
        <div
          className={cn("opacity-0 mt-4 w-full flex justify-center", {
            "opacity-100": currentSlide === content.length,
            "md:opacity-100": currentSlide === content.length - 2,
          })}
        >
          <Button
            className="text-purple"
            size="sm"
            title="Ver mas"
            variant="link"
            onClick={getTrending}
          >
            Cargar mas
          </Button>
        </div>
      )}
    </>
  )
}
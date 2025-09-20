"use client";

import React from "react";
import { Box, Image, IconButton, Flex } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import useEmblaCarousel from "embla-carousel-react";

interface ImageCarouselProps {
  images: string[];
  height?: string; // altura do carrossel, ex: "250px"
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, height = "250px" }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <Box position="relative" w="100%" overflow="hidden">
      <Box ref={emblaRef} className="embla" w="100%" overflow="hidden">
        <Flex className="embla__container">
          {images.map((img, index) => (
            <Box
              key={index}
              flex="0 0 100%"
              maxW="100%"
              position="relative"
              h={height}
              overflow="hidden"
              borderRadius="md"
              boxShadow="lg"
              mr={index !== images.length - 1 ? 4 : 0}
            >
              <Image src={img} alt={`Bicicletas Costa ${index + 1}`} objectFit="cover" w="100%" h="100%" />
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Botões de navegação */}
      <IconButton
        aria-label="Previous"
        icon={<ChevronLeftIcon />}
        position="absolute"
        top="50%"
        left="2"
        transform="translateY(-50%)"
        onClick={scrollPrev}
        bg="whiteAlpha.700"
        _hover={{ bg: "whiteAlpha.900" }}
        zIndex={10}
      />
      <IconButton
        aria-label="Next"
        icon={<ChevronRightIcon />}
        position="absolute"
        top="50%"
        right="2"
        transform="translateY(-50%)"
        onClick={scrollNext}
        bg="whiteAlpha.700"
        _hover={{ bg: "whiteAlpha.900" }}
        zIndex={10}
      />
    </Box>
  );
};

export default ImageCarousel;

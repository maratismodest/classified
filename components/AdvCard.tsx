'use client'
import {Apartment} from "@/types";
import {Card, CardBody} from "@chakra-ui/react";
import Image from "next/image";
import React from 'react';

const AdvCard = ({apartment}: { apartment: Apartment }) => {
  return (
    <Card className="mb-2">
      <CardBody className="flex">
        <div className='aspect-square w-24 h-24 relative'>
          <Image src={apartment.image} fill alt='' style={{objectFit: 'cover'}}/>
        </div>
        <div>
          <h1>{apartment.title}</h1>
          <p>Цена: {apartment.price}</p>
          {/*<p className='truncate'>Более развернутая информация будет в карточке</p>*/}
        </div>
      </CardBody>
    </Card>
  );
};

export default AdvCard;

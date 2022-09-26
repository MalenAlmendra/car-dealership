import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto} from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla',
    // }
  ];

  findAll() {
    return this.cars;
  }

  findById(id: string) {
    const filteredCar = this.cars.find((car) => car.id === id);
    if (!filteredCar)
      throw new NotFoundException(`Car with id ${id} not found.`);

    return filteredCar;
  }
  create(createCarDto:CreateCarDto){
   const car:Car={
      id:uuid(),
      ...createCarDto
    }
    this.cars.push(car)

    return car;
  }

  updateCar(id:string, updateCarDto:UpdateCarDto){
    let carDB= this.findById(id)

    if(updateCarDto.id && updateCarDto.id!==id) throw new BadRequestException(`Car id is not valid inside body`)

    this.cars=this.cars.map(car=>{
      if(car.id===id){
        carDB={
          ...carDB,
          ...updateCarDto,
          id
        }
        return carDB;
      }
    })
    return carDB;
  }

  deleteCar(id:string){
    const car=this.findById(id)
    this.cars=this.cars.filter(car=>car.id!==id)
    return { method: 'DELETE', id, message:"Car Deleted Successfully!" };
  }

  fillCarsWithSeedData(cars:Car[]){
     this.cars=cars;
  }
}

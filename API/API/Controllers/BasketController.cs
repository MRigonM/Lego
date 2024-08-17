using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepository;

        public BasketController(IBasketRepository basketRepository){
            _basketRepository = basketRepository;
            
        }

        [HttpGet]

        public async Task<ActionResult<CustomerBasket>> GetBasketById(string Id){

            var basket = await _basketRepository.GetBasketAsync(Id);

            return Ok(basket ?? new CustomerBasket(Id));
        }   

        [HttpPost]

        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasket basket){

            var updateBasket = await _basketRepository.UpdateBasketAsync(basket);
            
            return Ok(updateBasket);
        }

        public async Task DeleteBasketAsync(string Id){
            await _basketRepository.DeleteBasketAsync(Id);
        }
        
    }
}
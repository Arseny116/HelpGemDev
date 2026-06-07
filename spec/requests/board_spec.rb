require 'swagger_helper'

RSpec.describe 'board', type: :request do

  path '/boards' do

    post('create board') do
      tags 'Boards'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :board, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string, description: 'Название доски', example: 'Моя ГДД доска' },
          description: { type: :string, description: 'Описание доски', example: 'Доска для стратегии продукта' },
          teamId: { type: :string, description: 'ID команды в Miro', example: '123456789' }
        },
        required: ['name']
      }

      response(200, 'successful') do
        let(:board) { { name: 'Тест', description: 'Тест', teamId: '123' } }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end


      response(422, 'invalid request') do
        let(:params) { { name: '' } }
        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end
  end
end
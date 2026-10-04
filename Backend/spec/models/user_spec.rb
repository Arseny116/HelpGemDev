require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:user) do
    described_class.new(
      name: 'Test User',
      email: 'user@example.com',
      password: 'password123',
      password_confirmation: 'password123'
    )
  end

  it 'is valid with a unique valid email and password' do
    expect(user).to be_valid
  end

  it 'requires an email' do
    user.email = nil

    expect(user).not_to be_valid
    expect(user.errors[:email]).to include("can't be blank")
  end

  it 'rejects an invalid email format' do
    user.email = 'not-an-email'

    expect(user).not_to be_valid
    expect(user.errors[:email]).to include('is invalid')
  end

  it 'treats email uniqueness as case insensitive' do
    user.save!
    duplicate = described_class.new(email: 'USER@example.com', password: 'password123')

    expect(duplicate).not_to be_valid
    expect(duplicate.errors[:email]).to include('has already been taken')
  end

  it 'authenticates with the configured password' do
    user.save!

    expect(user.authenticate('password123')).to eq(user)
    expect(user.authenticate('wrong-password')).to be_falsey
  end

  it 'owns projects and project versions' do
    expect(user).to respond_to(:core_pillars, :project_versions)
  end
end

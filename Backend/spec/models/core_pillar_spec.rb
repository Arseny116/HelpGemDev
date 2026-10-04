require 'rails_helper'

RSpec.describe CorePillar, type: :model do
  let(:user) { User.create!(name: 'Test User', email: 'user@example.com', password: 'password123') }

  subject(:core_pillar) do
    described_class.new(
      user: user,
      name: 'Example project',
      pillars: [ 'Clarity', 'Speed' ]
    )
  end

  it 'belongs to a user' do
    expect(core_pillar).to be_valid
    expect(core_pillar.user).to eq(user)
  end

  it 'requires a user' do
    core_pillar.user = nil

    expect(core_pillar).not_to be_valid
    expect(core_pillar.errors[:user]).to include('must exist')
  end

  it 'stores project pillars as an array' do
    core_pillar.save!

    expect(core_pillar.reload.pillars).to eq([ 'Clarity', 'Speed' ])
  end

  it 'destroys its versions when destroyed' do
    core_pillar.save!
    version = core_pillar.project_versions.create!(user: user, version_number: 1, name: core_pillar.name, pillars: core_pillar.pillars)

    expect { core_pillar.destroy! }.to change(ProjectVersion, :count).by(-1)
    expect { version.reload }.to raise_error(ActiveRecord::RecordNotFound)
  end
end

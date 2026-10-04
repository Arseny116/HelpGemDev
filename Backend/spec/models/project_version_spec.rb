require 'rails_helper'

RSpec.describe ProjectVersion, type: :model do
  let(:user) { User.create!(name: 'Test User', email: 'user@example.com', password: 'password123') }
  let(:project) { CorePillar.create!(user: user, name: 'Example project', pillars: [ 'Clarity' ]) }

  subject(:project_version) do
    described_class.new(
      core_pillar: project,
      user: user,
      version_number: 1,
      name: 'Example project',
      pillars: [ 'Clarity' ]
    )
  end

  it 'is valid with a project, user, version number and name' do
    expect(project_version).to be_valid
  end

  it 'requires a version number' do
    project_version.version_number = nil

    expect(project_version).not_to be_valid
    expect(project_version.errors[:version_number]).to include("can't be blank")
  end

  it 'requires a name' do
    project_version.name = nil

    expect(project_version).not_to be_valid
    expect(project_version.errors[:name]).to include("can't be blank")
  end

  it 'does not allow the same version number twice for one project' do
    project_version.save!
    duplicate = described_class.new(core_pillar: project, user: user, version_number: 1, name: 'Updated project')

    expect(duplicate).not_to be_valid
    expect(duplicate.errors[:version_number]).to include('has already been taken')
  end

  it 'allows the same version number for different projects' do
    project_version.save!
    another_project = CorePillar.create!(user: user, name: 'Another project', pillars: [ 'Speed' ])
    another_version = described_class.new(core_pillar: another_project, user: user, version_number: 1, name: 'Another project')

    expect(another_version).to be_valid
  end

  it 'supports an attached PDF file' do
    project_version.pdf_file.attach(
      io: StringIO.new('%PDF-1.4 test'),
      filename: 'project.pdf',
      content_type: 'application/pdf'
    )

    expect(project_version.pdf_file).to be_attached
    expect(project_version.pdf_file.content_type).to eq('application/pdf')
  end
end
